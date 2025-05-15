<!-- defineProps({
  msg: String,
}); -->
<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});
const data = ref(null);
const xpath = ref("");
const crawlData = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: (xpath) => {
          const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.STRING_TYPE,
            null
          );
          return result.stringValue || "No result for given XPath";
        },
        args: [xpath.value],
      },
      (results) => {
        if (results && results[0].result) data.value = results[0].result;
      }
    );
  });
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="p-4">
    <h1 class="text-xl font-bold">Chrome Extension with Vue + Vite</h1>
    <div v-for="(path, index) in form.xpaths" :key="index" class="mb-2">
      <input
        v-model="form.xpaths[index]"
        placeholder="Enter XPath"
        class="p-2 border rounded w-full mb-1"
      />
      <p v-if="errors[`xpaths.${index}`]" class="text-red-500">
        {{ errors[`xpaths.${index}`] }}
      </p>
    </div>

    <button
      type="button"
      @click="addXPath"
      class="mt-2 p-2 bg-green-500 text-white rounded"
    >
      Add XPath
    </button>
    <button @click="crawlData" class="mt-2 p-2 bg-blue-500 text-white rounded">
      Search by XPath
    </button>

    <div class="mt-2">
      <h2 class="font-bold">XPath Result:</h2>
      <pre class="whitespace-pre-wrap">{{
        data.length ? data.join("\n\n") : "No data found."
      }}</pre>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
