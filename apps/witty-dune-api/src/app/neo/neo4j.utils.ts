import { Logger } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jConfig } from './neo4j.config.interface';

export const createDriver = async (config: Neo4jConfig) => {
  const logger = new Logger('Neo4j');
  const driver: Driver = neo4j.driver(
    `${config.scheme}://${config.host}`,
    neo4j.auth.basic(config.username, config.password)
  );
  driver.getServerInfo().then(() => {
    logger.log(`Connected to Neo4j`);
  });
  return driver;
};
