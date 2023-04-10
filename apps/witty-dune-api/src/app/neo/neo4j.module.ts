import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.utils';
import { NEO4J_DRIVER, NEO4J_CONFIG } from './neo4j.constants';
import { Neo4jConfig } from './neo4j.config.interface';

@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }

  static forRootAsync(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        } as Provider<any>,
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }
}
