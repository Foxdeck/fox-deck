<script setup lang="ts">
import AppCard from "@/core/components/AppCard/AppCard.vue";
</script>
<template>
  <Story
    title="Components/Cards"
  >
    <Variant title="Tonal">
      <AppCard
        image-url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D"
        headline="Glass Souls´ World Tour"
        subhead="The best Tour of the World!"
        supporting-text="From your recent favorites."
        :actions="[
          {
            variant: 'text',
            label: 'Contact'
          },
          {
            label: 'Buy Tour'
          },
        ]"
      />
    </Variant>
  </Story>
</template>