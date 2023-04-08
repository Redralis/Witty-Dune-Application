export const CreateUserQuery = `CREATE (n:User {objectId: $idParam, username: $usernameParam})`;
export const CreatePostQuery = `CREATE (n:Post {objectId: $idParam})`;
export const LinkPostToUserQuery = `MATCH (u:User {objectId: $userIdParam}), (p:Post {objectId: $postIdParam}) CREATE (u)-[:POSTED]->(p)`;