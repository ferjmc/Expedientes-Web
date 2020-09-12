<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div v-html="svg" />
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div v-html="svg" />
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Element Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-147.218 -12.414 794.435 174.828" style="background:0 0" preserveAspectRatio="xMidYMid"><defs><linearGradient id="editing-glowing-gradient" x1=".78" x2=".22" y1=".915" y2=".085"><stop offset="0" stop-color="#039ee8"/><stop offset="1" stop-color="#2ce8a5"/></linearGradient><filter id="editing-glowing" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="24.5"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#editing-glowing)"><path d="M6.22 0v-57.79H56.2v13.86H24.78v7.98h26.88v13.27H24.78v8.82h32V0H6.22zm93.4-23.1L116.26 0H96.77l-8.4-13.94h-.34L79.55 0H60.98l17.06-23.52-15.38-20.83h19.66l7.06 11.76h.33l7.06-11.76h18.48L99.62-23.1zm51.33-22.26q8.99 0 13.86 5.88 4.87 5.88 4.87 17.39 0 11.42-4.87 17.26-4.87 5.84-13.86 5.84-7.73 0-12.43-5.04v20.58H121.8v-60.9h13.61l1.43 6.3q4.87-7.31 14.11-7.31zm-5.21 12.35q-3.7 0-5.54 2.6-1.85 2.61-1.85 6.81v2.77q0 4.2 1.85 6.84 1.84 2.65 5.54 2.65 7.22 0 7.22-8.65v-4.45q0-8.57-7.22-8.57zm54.94-12.35q12.18 0 18.6 5.71 6.43 5.71 6.43 17.47v2.86h-33.27q0 4.79 2.15 7.22 2.14 2.44 6.76 2.44 4.2 0 6.17-1.76 1.98-1.77 1.98-4.71h16.21q0 8.07-6.13 12.6-6.14 4.54-17.9 4.54-12.34 0-19.15-5.76-6.8-5.75-6.8-17.43 0-11.42 6.63-17.3 6.64-5.88 18.32-5.88zm.67 10.67q-7.9 0-8.82 7.47h16.29q0-3.44-1.97-5.46-1.97-2.01-5.5-2.01zM279.64 0h-13.61l-1.43-6.3q-4.87 7.31-14.11 7.31-8.99 0-13.86-5.88-4.87-5.88-4.87-17.39 0-11.42 4.87-17.26 4.87-5.84 13.86-5.84 7.64 0 12.43 5.12V-60.9h16.72V0zM255.7-33.01q-7.23 0-7.23 8.65v4.45q0 8.57 7.23 8.57 3.69 0 5.54-2.6 1.85-2.61 1.85-6.81v-2.77q0-4.2-1.85-6.85-1.85-2.64-5.54-2.64zm51.4-16.55h-16.71V-60.9h16.71v11.34zm0 49.56h-16.71v-44.35h16.71V0zm33.6-45.36q12.18 0 18.61 5.71t6.43 17.47v2.86h-33.27q0 4.79 2.14 7.22 2.15 2.44 6.77 2.44 4.2 0 6.17-1.76 1.97-1.77 1.97-4.71h16.22q0 8.07-6.14 12.6-6.13 4.54-17.89 4.54-12.35 0-19.15-5.76-6.8-5.75-6.8-17.43 0-11.42 6.63-17.3 6.64-5.88 18.31-5.88zm.68 10.67q-7.9 0-8.82 7.47h16.29q0-3.44-1.97-5.46-1.98-2.01-5.5-2.01zm63-10.67q7.72 0 11.59 4.28 3.86 4.29 3.86 12.35V0h-16.71v-26.71q0-2.86-1.47-4.58-1.47-1.72-4.16-1.72-3.11 0-5.04 2.01-1.93 2.02-1.93 4.96V0H373.8v-44.35h13.69l1.09 6.72q2.61-3.53 6.85-5.63t8.95-2.1zm45.61 1.01h9.41v11.34h-9.41v16.88q0 3.03 1.01 4.41 1 1.39 3.69 1.39h4.71V-.5q-2.02.67-5.21 1.09-3.19.42-5.55.42-7.39 0-11.38-2.69-3.99-2.69-3.99-9.16v-22.17h-6.21v-11.34h6.88l3.62-13.44h12.43v13.44zm40.07-1.01q12.18 0 18.6 5.71 6.43 5.71 6.43 17.47v2.86h-33.27q0 4.79 2.15 7.22 2.14 2.44 6.76 2.44 4.2 0 6.17-1.76 1.98-1.77 1.98-4.71h16.21q0 8.07-6.13 12.6-6.14 4.54-17.9 4.54-12.34 0-19.15-5.76-6.8-5.75-6.8-17.43 0-11.42 6.63-17.3 6.64-5.88 18.32-5.88zm.67 10.67q-7.9 0-8.82 7.47h16.29q0-3.44-1.97-5.46-1.97-2.01-5.5-2.01zm53.51-10.67q8.9 0 15.07 3.49 6.18 3.48 6.18 10.79h-15.54q0-2.44-2.19-3.44-1.51-.84-3.78-.84-6.04 0-6.04 2.85 0 1.6 2.1 2.27 2.1.67 6.88 1.43 5.88.84 9.83 1.97 3.95 1.14 6.89 4.03 2.94 2.9 2.94 8.11 0 8.48-6.34 12.1-6.34 3.61-16.59 3.61-5.88 0-11.09-1.64t-8.48-5.08q-3.28-3.45-3.28-8.74h15.54v.34q.08 2.85 2.39 3.99 2.31 1.13 4.92 1.13 6.97 0 6.97-3.27 0-1.68-2.18-2.44-2.19-.76-7.14-1.6-5.97-1-9.79-2.18-3.82-1.18-6.68-3.99-2.85-2.81-2.85-7.85 0-8.15 6.17-11.6 6.17-3.44 16.09-3.44z" fill="url(#editing-glowing-gradient)" transform="translate(-36.4 113.725)"/></g><style></style></svg>'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
