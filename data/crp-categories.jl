
using DataFrames
using JSON

read_catcode_table(filename) = readtable(filename)

function table_to_map(table, key)
    map = Dict()

    for r in eachrow(table)
        map[r[key]] = { name => value for (name, value) in collect(r) }
    end

    map
end

function generate_catcode_map(filename, outname)
    table = read_catcode_table(filename)
    map = table_to_map(table, :Catcode)

    out = open(outname, "w")
    write(out, json(map))
    close(out)
end

length(ARGS) == 2 && generate_catcode_map(ARGS[1], ARGS[2])
