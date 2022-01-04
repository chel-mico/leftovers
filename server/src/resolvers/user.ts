import { User } from "../entities/User";
import { Arg, InputType, Mutation, Resolver, Field, Query, ObjectType, Ctx } from "type-graphql";
import argon2 from 'argon2';
import { Context } from "../types";
import { constants } from "../constants";
import { Fridge } from "../entities/Fridge";

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
        @Ctx() { req }: Context
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
        const newUser = User.create({
            ...input,
            authoredRecipes: []
        });

        const fridge = Fridge.create({
            fridgeIngredients: [],
            owner: newUser
        });
        newUser.fridge = fridge;
        newUser.fridgeId = fridge.id;
        await newUser.save();

        req.session.userId = newUser.id;
        req.session.fridgeId = fridge.id;
        
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

        req.session.userId = user.id;
        req.session.fridgeId = user.fridgeId;

        return {
            user
        }
    }

    @Mutation(() => Boolean)
    logout (
        @Ctx() { req, res }: Context
    ) {
        return new Promise((resolve) => 
            req.session.destroy((err) => {
                res.clearCookie(constants.__cookie__);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return
                }
                resolve(true)
            })
        )
    }

    @Query(() => User)
    userByName (
        @Arg('name', () => String) name: string,
    ): Promise<User | undefined> {
        return User.findOne({username: name});
    }

    @Query(() => User, { nullable: true })
    me (
        @Ctx() { req }: Context,
    ): Promise<User | undefined> | null {
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }
}