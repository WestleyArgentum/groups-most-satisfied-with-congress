
using JSON

const industries_filename = "112th-industries.json"
const bills_filename = "112th-bills.json"

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

function build_engagement_map(bills, industries)
    engagement_map = Dict()

    for (id, name) in industries
        engagement_map[id] = {
            "supported" => 0,
            "opposed" => 0
        }
    end

    for (aid, data) in bills
        supporters = data["positions"]["support"]
        for ind in supporters
            engagement_map[ind]["supported"] += 1
        end

        opposers = data["positions"]["opposed"]
        for ind in opposers
            engagement_map[ind]["opposed"] += 1
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
            "x" => industries[ind],
            "y" => engagement_map[ind]["supported"]
        })

        push!(opposed_data, {
            "id" => ind,
            "x" => industries[ind],
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


industries = JSON.parse(readall(industries_filename))
bills = JSON.parse(readall(bills_filename))
bills = filter_overlapping_votes(filter_has_votes(bills))

for (aid, data) in bills
    data["positions"]["support"] = unique(data["positions"]["support"])
    data["positions"]["opposed"] = unique(data["positions"]["opposed"])
end


engagement_map = build_engagement_map(bills, industries)

out = open(output_total_positions, "w")
write(out, json(format_engagement_data(engagement_map, sort_total_positions)))
close(out)

out = open(output_support_positions, "w")
write(out, json(format_engagement_data(engagement_map, sort_support_positions)))
close(out)

out = open(output_oppose_positions, "w")
write(out, json(format_engagement_data(engagement_map, sort_opposed_positions, false)))
close(out)
