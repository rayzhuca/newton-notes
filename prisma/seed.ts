import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function makeid(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function main() {
    for (let i = 0; i < 20; ++i) {
        await prisma.note.create({
            data: {
                title: "test-" + makeid(10),
                lecture: Math.round(Math.random() * 10),
                quarter: makeid(10),
                professor: makeid(10),
                course: makeid(10),
                body: makeid(10),
                userId: "662a82307b1569cbef460c98",
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
