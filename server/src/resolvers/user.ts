import { User } from "../entities/User";
import { Arg, InputType, Mutation, Resolver, Field, Query, ObjectType } from "type-graphql";
import argon2 from 'argon2';
import { constants } from "../constants";

@InputType()
class Login {
    @Field(() => String)
    email: string = "";
    @Field(() => String)
    username: string = "";
    @Field()
    password: string;
}

@InputType()
class Register {
    @Field()
    email: string;
    @Field()
    username: string;
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
    @Mutation(() => User)
    async register (
        @Arg('input', () => Register) input: Register,
    ): Promise<UserResponse> {
        const user = await User.findOne({where: [
            {username: input.username},
            {email: input.email}
        ]});
        if (user) {
            return {errors: [{
                field: 'username',
                message: "User already exists!"
            }]}
        }
        if (!input.email.match(constants.emailCheck)) {
            return {errors: [{
                field: 'email',
                message: "Not a valid email!"
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
    async loginUserPass (
        @Arg('input', () => Login) input: Login,
    ): Promise<UserResponse> {
        const user = await User.findOne({where: [
            {username: input.username},
            {email: input.email}
        ]});
        if (!user) {
            return {errors: [{
                field: 'username',
                message: "Username doesn't exist!"
            }]}
        }

        const valid = await argon2.verify(user.password, input.password)
        if (!valid) {
            return {errors: [{
                field: 'password',
                message: "Password is incorrect!"
            }]}
        }

        return {
            user: user
        }
    }

    @Query(() => User)
    userByID (
        @Arg('id', () => String) id: string,
    ): Promise<User | undefined> {
        return User.findOne(id);
    }

    @Query(() => User)
    userByName (
        @Arg('name', () => String) name: string,
    ): Promise<User | undefined> {
        return User.findOne({username: name});
    }
}