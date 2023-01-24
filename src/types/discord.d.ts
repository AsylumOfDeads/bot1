import { Collection } from "discord.js"

declare module "discord.js" {
  export interface Client {
      commands: Collection<unknown, any>
      interactions: Collection<string, Function>
      extras: Collection<string, any>
    }
}