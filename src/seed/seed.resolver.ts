import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Query(() => String)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
