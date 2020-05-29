import {Context} from "./context.interface";
import {AuthChecker} from "type-graphql";

export const authChecker: AuthChecker<Context> = ({context: {user}}, roles) => {
    if (roles.length === 0) {
        return user !== undefined; // jika berupa `@Authorized()`, check hanya jika user ada
    }

    if (!user) { // User tidak ditemukan
        return false;
    }

    if (user.roles.some(role => roles.includes(role))) {
        return true; // Role ditemukan dari user sesuai akses
    }

    console.log('AKSES ROLE', roles);
    console.log('ROLE USER', user.roles);

    // Tidak ditemukan role pada user yang sesuai akses
    return false;
};
