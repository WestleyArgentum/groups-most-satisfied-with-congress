
using JSON

const catcodes_filename = "crp-categories.json"
const bills_filenames = ["113th-bills.json", "112th-bills.json"]

const output_total_positions = "industry-engagement.json"
const output_support_positions = "top-supporters.json"
const output_oppose_positions = "top-opposers.json"

function filter_overlapping_votes(bills)
    overlap = Any[]
    for (k,v) in bills
        for (k2,v2) in bills
            if k != k2 && v["num"] == v2["num"] && v["prefix"] == v2["prefix"]
                if !([k, k2] in overlap) && !([k2, k] in overlap)
                    push!(overlap, [k, k2])
                end
            end
        end
    end

    for (id1, id2) in overlap
        (haskey(bills, id1) && haskey(bills, id2)) || continue

        passed1 = get(bills[id1], "dateVote", -1)
        passed2 = get(bills[id2], "dateVote", -2)
        if passed1 == passed2
            delete!(bills, id1)
        end
    end

    bills
end

function filter_has_votes(bills)
    filter((k,b)->get(b, "action", "") == "passage", bills)
end

function remap_historical_catcodes(catcode)
    if catcode == "LT200"
        catcode = "LM150"
    elseif catcode == "A7000"
        catcode = "A0000"
    end

    catcode
end

function build_engagement_map(bills, catcodes)
    engagement_map = Dict()

    for (id, name) in catcodes
        engagement_map[name["Industry"]] = {
            "supported" => 0,
            "opposed" => 0
        }
    end

    for (aid, data) in bills
        supporters = data["positions"]["support"]
        for ind in supporters
            ind_code = remap_historical_catcodes(ind)
            catcode = catcodes[ind_code]["Industry"]
            engagement_map[catcode]["supported"] += 1
        end

        opposers = data["positions"]["oppose"]
        for ind in opposers
            ind_code = remap_historical_catcodes(ind)
            catcode = catcodes[ind_code]["Industry"]
            engagement_map[catcode]["opposed"] += 1
        end
    end

    engagement_map
end

function format_engagement_data(engagement_map, sort_by, support_first = true)
    order = collect(keys(engagement_map))
    sort!(order, lt = (lhs, rhs) -> sort_by(engagement_map, lhs, rhs))

    if support_first
        engagement_table = [
            { "name" => "Bills Supported by Group", "data" => Any[] },
            { "name" => "Bills Opposed by Group", "data" => Any[] }
        ]

        supporter_data = engagement_table[1]["data"]
        opposed_data = engagement_table[2]["data"]
    else
        engagement_table = [
            { "name" => "Bills Opposed by Group", "data" => Any[] },
            { "name" => "Bills Supported by Group", "data" => Any[] }
        ]

        supporter_data = engagement_table[2]["data"]
        opposed_data = engagement_table[1]["data"]
    end

    for ind in order
        push!(supporter_data, {
            "id" => ind,
            "x" => ind,
            "y" => engagement_map[ind]["supported"]
        })

        push!(opposed_data, {
            "id" => ind,
            "x" => ind,
            "y" => engagement_map[ind]["opposed"]
        })
    end

    engagement_table
end

function sort_total_positions(engagement_map, lhs, rhs)
    return ((engagement_map[lhs]["supported"] + engagement_map[lhs]["opposed"]) >
        (engagement_map[rhs]["supported"] + engagement_map[rhs]["opposed"]))
end

function sort_support_positions(engagement_map, lhs, rhs)
    return engagement_map[lhs]["supported"] > engagement_map[rhs]["supported"]
end

function sort_opposed_positions(engagement_map, lhs, rhs)
    return engagement_map[lhs]["opposed"] > engagement_map[rhs]["opposed"]
end


catcodes = JSON.parse(readall(catcodes_filename))
bills = [ JSON.parse(readall(file)) for file in bills_filenames ]
bills = [ filter_overlapping_votes(filter_has_votes(bill_set)) for bill_set in bills ]

engagement_maps = [ build_engagement_map(bill_set, catcodes) for bill_set in bills ]

out = open(output_total_positions, "w")
write(out, json([format_engagement_data(map, sort_total_positions) for map in engagement_maps]))
close(out)

out = open(output_support_positions, "w")
write(out, json([format_engagement_data(map, sort_support_positions) for map in engagement_maps]))
close(out)

out = open(output_oppose_positions, "w")
write(out, json([format_engagement_data(map, sort_opposed_positions, false) for map in engagement_maps]))
close(out)
