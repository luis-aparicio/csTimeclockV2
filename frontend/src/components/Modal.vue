<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />
      <div class="modal__dialog">
        <div class="modal__body d-flex">
          <button
            type="button"
            class="btn btn-primary btn-circle btn-sm align-self-end align-middle"
            @click="closeModal()"
          >
            &#10006;
          </button>
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    openModal() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
    
  }
  &__body {
    flex-direction: column;
    align-items: stretch;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.btn-circle.btn-sm {
  background: #21a7d0;
  width: 31px;
  height: 31px;
  margin: 8px;
  border-radius: 15px;
  text-align: center;
  border: transparent;
}

.btn-circle.btn-sm:hover {
  background-color: #38b9e0;
  border: transparent;
}
</style>
