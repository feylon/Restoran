<template>
    <n-card title="Parolni almashtirish" class="select-none max-h-[390px]">
      <div>
          <n-form-item label="Joriy parol">
              <n-input v-model:value="password"  type="password" placeholder="1345678" />
          </n-form-item>
          <n-form-item label="Yangi parol">
              <n-input v-model:value="newPassword" type="password" placeholder="1345678" />
          </n-form-item>
          <n-form-item label="Yangi parolni tasdiqlang">
              <n-input v-model:value="confirmPassword" type="password" placeholder="1345678" />
          </n-form-item>
          <n-form-item class="flex justify-end">
              <n-button @click="changepassword" type="primary" title="Saqlash"><font-awesome-icon :icon="['fas', 'check']" /></n-button>
          </n-form-item>
      </div>
    </n-card>
  
  
  </template>
  
  <script setup>
  import { ref,h } from 'vue';
  import url from '../../../../url';
  import { fetchAdmin } from '../../../../http';
  import { useMessage, NAlert } from 'naive-ui';
  import router from '../../../../Pages';
  const password = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  const message = useMessage();
  const renderMessage = (props) => {
    const { type } = props;
    return h(
      NAlert,
      {
        closable: props.closable,
        onClose: props.onClose,
        type: type === "loading" ? "default" : type,
        title: "Xatolik",
        style: {
          boxShadow: "var(--n-box-shadow)",
          maxWidth: "calc(100vw - 32px)",
          width: "480px",
          filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)"
        }
      },
      {
        default: () => props.content
      }
    );
  };
  
  const { error } = useMessage();
  
  const changepassword = async() => {
  
      if(newPassword.value !== confirmPassword.value) {
          error("Parollarni tasdiqlang", {
      render: renderMessage,
      closable: true
    });
          return;
      }
  
      if(password.value === '' || newPassword.value === '' || confirmPassword.value === '') {
          error("Parolni kiriting", { render: renderMessage, closable: true });return ;}
      const data = {
          oldpassword: password.value,
          newpassword: newPassword.value
      }
      console.log(data);
      try {
          let response = await fetchAdmin(`admin/changepassword`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(data)
      }, router);
      console.log(response.status);
      if(response.status == 400){
          response = await response.json();
  
          throw new Error(response.error);
      }
      if(response.status === 200) {
          message.success("Parol almashtirildi");
          password.value = '';
          newPassword.value = '';
          confirmPassword.value = '';
      }}catch (error) {
        message.error(error.message);  
        console.log(error);
      }
  };
  </script>
  
  <style scoped>
  .n-card {
    max-width: 300px;
  }
  </style>