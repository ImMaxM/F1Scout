import { DriversService } from "../interfaces/drivers/drivers";

export class ErgastClient {
  public drivers: DriversService;
  protected readonly baseUrl: string;

  constructor(baseUrl: string = "https://ergast.com/api/f1") {
    this.baseUrl = baseUrl;
    this.drivers = new DriversService(this);
  }

  /**
   * Fetch data from the Ergast API
   *
   * @param path The Ergast path to fetch data from
   * @param limit How many items to fetch
   * @param offset The offset to start fetching from
   * @returns {Promise<ErgastData>}
   */
  async fetch(
    path: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<ErgastData | null> {
    const url = `${this.baseUrl}/${path}.json?limit=${limit}&offset=${offset}`;
    console.log(`Fetching data from ${url}`);
    try {
      const response = await fetch(url);
      return (await response.json()) as ErgastData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export interface ErgastData {
  MRData: {};
}
