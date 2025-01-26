import axios from "axios";

const API_URL = "http://192.168.15.5:3000"; 

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  primeiro_acesso: number;
}

export interface ExposicaoUsuario {
  id: number;
  usuario_id: number;
  data: string;
  tempo_exposicao_segundos: number;
  uv_medio: number;
}

const dbService = {
  async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await axios.get<Usuario[]>(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  async createUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    try {
      const response = await axios.post<Usuario>(`${API_URL}/usuarios`, {
        nome,
        email,
        senha,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  async getExposicaoByUsuario(usuarioId: number): Promise<ExposicaoUsuario[]> {
    try {
      const response = await axios.get<ExposicaoUsuario[]>(`${API_URL}/exposicao/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar exposições do usuário:", error);
      throw error;
    }
  },

  async createExposicaoUsuario(
    usuarioId: number,
    data: string,
    tempoExposicaoSegundos: number,
    uvMedio: number
  ): Promise<ExposicaoUsuario> {
    try {
      const response = await axios.post<ExposicaoUsuario>(`${API_URL}/exposicao`, {
        usuario_id: usuarioId,
        data,
        tempo_exposicao_segundos: tempoExposicaoSegundos,
        uv_medio: uvMedio,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar exposição do usuário:", error);
      throw error;
    }
  },

  async loginUsuario(email: string, senha: string): Promise<Usuario | null> {
    try {
      const response = await axios.post<Usuario>(`${API_URL}/login`, {
        email,
        senha,
      });

      if (response.data) {
        return response.data;
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  async atualizarPrimeiroLogin(usuarioId: number): Promise<void> {
    try {
      await axios.put(`${API_URL}/usuarios/${usuarioId}`, {
        primeiro_acesso: 0,
      });
    } catch (error) {
      console.error("Erro ao atualizar primeiro login:", error);
      throw error;
    }
  },
};

export default dbService;
