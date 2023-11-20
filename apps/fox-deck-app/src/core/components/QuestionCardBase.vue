<template>
  <section
      class="flex flex-col
            justify-center items-center font-serif
            absolute w-10/12 aspect-square shadow-xl bg-white p-4 cursor-pointer select-none
            border border-gray-200
            sm:w-8/12
            md:w-5/12
            xl:w-4/12
            2xl:w-3/12
            hover:shadow-2x">
    <slot />
  </section>
</template>