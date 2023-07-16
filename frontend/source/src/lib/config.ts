type _Config = {
    apiUrl: string;
}

const Config: _Config = {
    apiUrl: process.env.API_ORIGIN || "http://localhost:3000/"
};

export default Config;
