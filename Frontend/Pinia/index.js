
import { defineStore } from 'pinia'

 const Admin = defineStore('counter', {
  state: () => {
    return {
        name: "Salom",
        login: "salom1409",
        lastname: "Ergashev\n",
        firstname: "Jamshid",
        birthday: "1989-12-31T18:00:00.000Z",
        admin_name: "main",
        permission_id: "1",
        email: "user@example.com",
        profile_url: "/uploads/profile_pics/f54efbfefc3bc732793e8a4c16425f40.jpg",
        count: 0
    }
  },
  
  actions: {
    increment() {
      this.count++
    },
  },
});
export {Admin}