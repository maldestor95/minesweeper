<template>

  <div id="myModal" class="modal" v-if="showModal">

    <div class="modal-content">
      <slot >
        <span class="close" @click="showModal = false">&times;</span>
        <p>Some text in the Modal..</p>
        <button @click="showModal = false">hide</button>
      </slot>
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { defineModel } from "vue";
  const showModal = defineModel({ default: false });
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 80%;
  @apply rounded-xl
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}</style>
