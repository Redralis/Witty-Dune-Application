export const CreateUserQuery = `CREATE (n:User {objectId: $idParam, username: $usernameParam})`;
export const CreatePostQuery = `CREATE (n:Post {objectId: $idParam})`;
export const LinkPostToUserQuery = `MATCH (u:User {objectId: $userIdParam}), (p:Post {objectId: $postIdParam}) CREATE (u)-[:POSTED]->(p)`;
export const DeleteUserAndAllLinkedPostsQuery = `MATCH (u:User {objectId: $idParam})-[r:POSTED]->(p:Post) DELETE u, r, p`;
export const DeletePostAndRelationshipQuery = `MATCH (u:User)-[r:POSTED]->(p:Post {objectId: $idParam}) DELETE r, p`;
export const GetPostsLinkedWithUser = `MATCH (u:User {objectId: $userIdParam})-[r:POSTED]->(p:Post) RETURN p`;