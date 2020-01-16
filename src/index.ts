import * as dotenv from "dotenv";
import { TwitterClient } from "./Services/TwitterClient";
import { IHeadlineRepository } from "./Repositories/IHeadlineRepository";
import { HeadlineRepository } from "./Repositories/HeadlineRepository";
import { createConnection } from "mysql";
import { IHeadline } from "./Models/IHeadline";
dotenv.config();

async function main() {
  const {
    API_KEY: consumer_key = "",
    API_SECRET_KEY: consumer_secret = "",
    ACCESS_TOKEN: access_token_key = "",
    ACCESS_TOKEN_SECRET: access_token_secret = "",
    GOOD_NEWS_DB_HOST: host,
    GOOD_NEWS_DB_USER: user,
    GOOD_NEWS_DB_PASSWORD: password,
    GOOD_NEWS_DATABASE: database
  } = process.env;

  const dbConnection = createConnection({
    host,
    user,
    password,
    database
  });

  const headlineRepository: IHeadlineRepository = new HeadlineRepository(
    dbConnection
  );
  const headline: IHeadline = await headlineRepository.fetchMostPositiveHeadline();
  dbConnection.end();

  const twitterClient = new TwitterClient({
    access_token_key,
    access_token_secret,
    consumer_key,
    consumer_secret
  });
  await twitterClient.tweetHeadline(headline);
}

main().then();
