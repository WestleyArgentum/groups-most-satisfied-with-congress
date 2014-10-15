
## Data Story

1. Load and parse `maplight-112th-bills-2014-08-22.csv`. Each row in this file represents a combination of `Bill`, `Motion`, `ActionID`, `Session`, `Industry`, `Catcode`, and `InterestGroupSupport`. We will use this data to build two new datasets.

2. Build a map of `ActionID` => `Bill`

3. Build a map of `ActionID` => { "support": [...], "opposed": [...] }

4. Scrape Maplight for data about every action on every bill. Using the `ActionID` => `Bill` map, we can construct maplight urls. See [maplight-scraper](https://github.com/WestleyArgentum/maplight-scraper) for more details. We're interested in all the data we can get about each action: the session, prefix, and bill number, the chamber, the type of action, whether the action passed, when the bill was introduced, and when this action occured.
