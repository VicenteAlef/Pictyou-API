const userController = {
    async deleteProfile(req, res) {
        try {
            //code
        } catch (error) {
            console.error('Erro ao excluir perfil. ', error);
            return res.status(500).json({message: "Erro ao excluir usuario"})
        }
    }
}