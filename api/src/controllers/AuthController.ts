import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword, CreateHashPassword } from "../utils/HashPassword";
import { generateJWToken } from "../utils/JWT";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }
    async signIn(req: Request, res: Response){
        try{
            const { email, password } = req.body;

            if(!email || !password){
                return res.json({
                    status: 400,
                    message: "Email ou senha não informados."
                })
            }

            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if(!user){
                return res.json({
                    status: 404,
                    message: "Usuário não existe."
                })
            }
            
            const passwordChecks = await CheckUserPassword(password, user.password)

            if(!passwordChecks){
                return res.json({
                    status: 401,
                    message: "Senha incorreta."
                })
            }

            const token = generateJWToken(user)
            return res.json({
                status: 200,
                user:{
                    token
                }, 
                message: "Autenticado com sucesso."
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
        
        
    }
    async signUp(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword, name } = req.body;

            if (password !== confirmPassword) { 
                return res.status(400).json({
                    status: 400,
                    message: "As senhas devem ser iguais.",
                });
            }


            const existingUser = await prisma.user.findFirst({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    message: "Já existe um usuário com este e-mail.",
                });
            }

            // Cria o hash da senha
            const hashedPassword = await CreateHashPassword(password);

            if (!hashedPassword) {
                return res.status(500).json({
                    status: 500,
                    message: "Erro ao gerar hash de senha.",
                });
            }

            // Salva o novo usuário no banco de dados
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name, // Incluí o nome como exemplo
                },
            });

            return res.status(201).json({
                status: 201,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    nome: newUser.name,
                },
                message: "Usuário criado com sucesso.",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "Falha ao realizar registro."
            });
        }
    }

}

export default new AuthController()