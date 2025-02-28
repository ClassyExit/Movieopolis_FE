<template>
  <div class="p-4 space-y-4">
    <div @click="getQueue" class="btn">Get Queue</div>

    <div class="flex flex-col space-y-2">
      <div
        v-if="admin.queue.queue?.length > 0"
        v-for="item in admin.queue.queue"
        :key="item.firebase_uid"
        class="flex flex-row space-x-2 items-center justify-between"
      >
        <div class="w-1/2 md:w-96 truncate text-left">
          UID: {{ item.firebase_uid }}
        </div>
        <div class="flex flex-row space-x-4">
          <div
            @click="approveUser(item.firebase_uid)"
            class="btn btn-xs md:btn-sm btn-success"
          >
            Approve
          </div>
          <div
            @click="declineUser(item.firebase_uid)"
            class="btn btn-xs md:btn-sm btn-error"
          >
            Decline
          </div>
        </div>
      </div>
      <div v-else>No items in queue</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { admin } = storeToRefs(userStore);

if (!userStore.permissions?.isAdmin) {
  router.push({ name: "Home" });
}

const getQueue = () => {
  if (userStore.user) {
    userStore.getAdminQueue(userStore.user.uid);
  }
};

const approveUser = (uid) => {
  userStore.approveUserTicket(uid);
};

const declineUser = (uid) => {
  userStore.deleteQueueTicket(uid);
};

// Automatically fetch queue on mount
onMounted(() => {
  getQueue();
});
</script>
