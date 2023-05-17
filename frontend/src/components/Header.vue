<template>
  <header>
    <div class="logo">Melo Muse</div>
    <div class="menu-icon" @click="toggleMenu">
      <i class="fa fa-bars"></i>
    </div>
    <div class="menu" :class="{ 'menu-open': isMenuOpen }">
      <ul>
        <li><a href="#">Perfil</a></li>
        <li><a href="#" @click="logout">Logout</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async logout() {
      try {
        const response = await fetch('http://127.0.0.1:5000/melomuse/api/v1/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'xdd'
          },
        });
        if (response.ok) {
          Cookies.remove('access_token');
          this.$router.push({ name: 'Login' });
        }
      } catch (error) {
        console.error(error);
        alert('Ocurrió un error al intentar cerrar sesión');
      }
    },
  },
};
</script>

<style>
header {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.menu-icon {
  font-size: 24px;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 4px;
  display: none;
}

.menu-open {
  display: block;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin-bottom: 10px;
}

.menu a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
}

.tab {
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  margin: 0 10px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #fff;
}
</style>
