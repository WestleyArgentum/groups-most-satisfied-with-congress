
## Data Story

All the data you need to reproduce these findings is publically available. Below are rough steps and links to code that can help you towards that end.

### Acquire the raw data
First things first, you need to download the bulk data provided by maplight and use it to scrape their site for more information of interest. The [maplight-scraper](https://github.com/WestleyArgentum/maplight-scraper) should help greatly with this.

In that repository you should find bulk csv files containing rows with `Bill`, `Motion`, `ActionID`, `Session`, `Industry`, `Catcode`, and `InterestGroupSupport` fields. That data will form the basis for this story, but you'll also have to scrape information about what kinds of actions were taken on bills, etc. See the [maplight-scraper readme](https://github.com/WestleyArgentum/maplight-scraper/blob/master/README.md) for a more detailed walkthrough of how to do that.

### Work with the condensed bills and industries datasets
Once you have a map of `ActionID` to bill information and of `Industry` codes to human-friendly names, you should be able to run the included `industry-enguagement.jl` script. This will filter out bills that were never voted on, duplicate votes, etc, and leave you with a table of industries and the number of bills they supported / opposed.
