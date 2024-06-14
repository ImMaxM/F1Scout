import { ErgastClient } from "../../utils/ergastRequest";

export class DriversService {
  private ergast: ErgastClient;

  constructor(ergast: ErgastClient) {
    this.ergast = ergast;
  }

  /**
   * Get a list of drivers
   *
   * @param {number} season Get drivers for a specific season
   * @param {number} round Get drivers for a specific round
   * @param {number} limit Limit the number of drivers returned
   * @returns {Array<Driver>}
   *
   * @example
   * // Fetch the drivers for the 2024 season
   * const drivers = await ergast.drivers.get(2024);
   * console.log(drivers);
   */
  async get(
    season?: number,
    round?: number,
    limit: number = 30
  ): Promise<Driver[]> {
    const endpoint = season
      ? `${season}${round ? `/${round}` : ""}/drivers`
      : "drivers";
    const data = (await this.ergast.fetch(endpoint, limit)) as DriverData;
    return data.MRData.DriverTable.Drivers;
  }
}

export interface DriverData {
  MRData: {
    DriverTable: {
      Drivers: Driver[];
    };
  };
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}
