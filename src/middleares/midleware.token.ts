import jwt from 'jsonwebtoken'

export const idUsuarioNoToken = async (token: string) => {
    try {

        const { id } = jwt.verify(token, process.env.SECRET_JWT || "") as jwt.JwtPayload;

        return id;
    } catch (error) {
        return false;
    }

};

export default idUsuarioNoToken;