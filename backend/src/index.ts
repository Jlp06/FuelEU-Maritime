import { app } from "./infrastructure/server/express";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
