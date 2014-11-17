
## Data Story

All the data you need to reproduce these findings is publically available. Below are rough steps and links to code that can help you towards that end.

1. Load and parse `maplight-112th-bills-2014-08-22.csv`. Each row in this file represents a combination of `Bill`, `Motion`, `ActionID`, `Session`, `Industry`, `Catcode`, and `InterestGroupSupport`. We will use this data to build our other datasets.

2. Build a map of `ActionID` => `Bill`

3. Scrape Maplight for data about every action on every bill. Using the `ActionID` => `Bill` map, we can construct maplight urls. See [maplight-scraper](https://github.com/WestleyArgentum/maplight-scraper) for more details. We're interested in all the data we can get about each action: the session, prefix, and bill number, the chamber, the type of action, whether the action passed, when the bill was introduced, and when this action occured.

4. Build a map of the above data and attach to each `ActionID` a dictionary of `postions` => `{ "support": [...], "opposed": [...] }`

5. Use the origional `maplight-112th-bills-2014-08-22.csv` to build a map of `Catcode` => `Industry Description` (useful for knowing what you're looking at)

6. Use `industry-enguagement.jl` to marshal your data into a graphable form.
