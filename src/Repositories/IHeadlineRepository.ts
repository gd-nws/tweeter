import { IHeadline } from "../Models/IHeadline";

export interface IHeadlineRepository {
  /**
   * Fetch the most positive headline for the day.
   */
  fetchMostPositiveHeadline(): Promise<IHeadline>;
}
