import axios from 'axios';

class Api {
  #requester = axios.create({
    baseURL: 'https://your-energy.b.goit.study/api/',
  });

  async #get(path) {
    return (await this.#requester.get(path)).data;
  }

  async exerciseInfo(exerciseId) {
    return this.#get(`exercises/${exerciseId}`);
  }
}

export const api = new Api();
