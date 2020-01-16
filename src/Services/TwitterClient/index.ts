import Twitter from "twitter";
import { IHeadline } from "../../Models/IHeadline";
import { ITwitterCredentials } from "../../Models/ITwitterCredentials";

/**
 * Client for updating twitter status.
 */
export class TwitterClient {
  private client: Twitter;
  private updatePath: string = "statuses/update";
  private hashTags: string[] = ["#headlines", "#news", "#GoodNews"];

  /**
   * Get an instance of the client
   * @param {ITwitterCredentials} twitterCredentials - Twitter credentials.
   */
  constructor(twitterCredentials: ITwitterCredentials) {
    this.client = new Twitter(twitterCredentials);
  }

  /**
   * Post a tweet to twitter.
   * @param {string} status - Status to post.
   */
  private async postTweet(status: string): Promise<void> {
    await this.client.post(this.updatePath, {
      status
    });
  }

  /**
   * Post a headline to twitter.
   * @param {IHeadline} headline - Headline to share.
   */
  public async tweetHeadline(headline: IHeadline): Promise<void> {
    // Format as array to remove tabs from string literal.
    const lines = [
      `The most positive headline of ${new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/")} is:`,
      ``,
      headline.headline,
      ``,
      `Read more at https://gdnws.co.uk/#/headlines/${headline.id}`,
      ``,
      this.hashTags.join(" ")
    ];

    await this.postTweet(lines.join("\n"));
  }
}
