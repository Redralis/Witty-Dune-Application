// This file contains all the cypher queries used in the app
export const CreateUserQuery = `CREATE (n:User {objectId: $idParam, username: $usernameParam})`;
export const CreatePostQuery = `CREATE (n:Post {objectId: $idParam})`;
export const LinkPostToUserQuery = `MATCH (u:User {objectId: $userIdParam}), (p:Post {objectId: $postIdParam}) CREATE (u)-[:POSTED]->(p)`;
export const DeleteUserAndAllLinkedPostsAndAllRelationships = `MATCH (u:User {objectId: $idParam})-[r1]-() OPTIONAL MATCH (u)-[r2:POSTED]->(p:Post) DETACH DELETE r1, r2, p, u`
export const DeletePostAndRelationshipQuery = `MATCH (u:User)-[r:POSTED]->(p:Post {objectId: $idParam}) DELETE r, p`;
export const GetPostsLinkedWithUser = `MATCH (u:User {objectId: $userIdParam})-[r:POSTED]->(p:Post) RETURN p`;
export const GetFollowedUsers = `MATCH (u:User {objectId: $userIdParam})-[r:FOLLOWS]->(f:User) RETURN f`;
export const FollowOtherUserByName = `MATCH (u:User {objectId: $userIdParam}), (f:User {username: $usernameParam}) CREATE (u)-[:FOLLOWS]->(f)`;
export const UnfollowOtherUserByName = `MATCH (u:User {objectId: $userIdParam})-[r:FOLLOWS]->(f:User {username: $usernameParam}) DELETE r`;
export const GetPostsOfUsersFollowedByUser = `MATCH (u:User {objectId: $userIdParam})-[r:FOLLOWS]->(f:User)-[r2:POSTED]->(p:Post) RETURN p`;
export const GetPostsOfUsersFollowedByUsersFollowedByUserExcludingUsersFollowedByUser = `MATCH (u:User {objectId: $userIdParam})-[r:FOLLOWS]->(f:User)-[r2:FOLLOWS]->(f2:User)-[r3:POSTED]->(p:Post) WHERE NOT (u)-[:FOLLOWS]->(f2) AND f2 <> u RETURN p`;