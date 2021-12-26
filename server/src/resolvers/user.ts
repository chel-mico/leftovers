import { User } from "../entities/User";
import { Arg, InputType, Mutation, Resolver, Field, Query, ObjectType, Ctx } from "type-graphql";
import argon2 from 'argon2';
import { Context } from "src/types";

@InputType()
class Login {
    @Field(() => String)
    username: string = "";
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]
    @Field(() => User, {nullable: true})
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register (
        @Arg('input', () => Login) input: Login,
    ): Promise<UserResponse> {
        if (input.username.length < 3 || input.username.length > 32) {
            return {errors: [{
                field: 'username',
                message: "Usernames must be between 3 and 32 characters long!"
            }]}
        }

        const user = await User.findOne({where: [
            {username: input.username}
        ]});
        if (user) {
            return {errors: [{
                field: 'username',
                message: "Username already taken!"
            }]}
        }

        input.password = await argon2.hash(input.password);
        const newUser = await User.create({
            ...input
        }).save();
        return {
            user: newUser
        }
    }

    @Mutation(() => UserResponse)
    async login (
        @Arg('input', () => Login) input: Login,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        if (input.username == "") {
            return {errors: [{
                field: 'username',
                message: "You must enter a username!"
            }]}
        }

        const user = await User.findOne({where: [
            {username: input.username}
        ]});
        if (!user) {
            return {errors: [{
                field: 'username',
                message: "User doesn't exist!"
            }]}
        }

        const valid = await argon2.verify(user.password, input.password)
        if (!valid) {
            return {errors: [{
                field: 'password',
                message: "Password is incorrect!"
            }]}
        }

        req.session.userId = user.id

        return {
            user: user
        }
    }

    @Query(() => User)
<<<<<<< Updated upstream
    userByID (
        @Arg('id', () => String) id: string,
    ): Promise<User | undefined> {
        return User.findOne(id);
    }

    @Query(() => User)
=======
>>>>>>> Stashed changes
    userByName (
        @Arg('name', () => String) name: string,
    ): Promise<User | undefined> {
        return User.findOne({username: name});
    }
}