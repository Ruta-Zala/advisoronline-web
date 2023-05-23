<template>
	<slot v-bind="$attrs">
		<!-- Use this component in templates when you don't want to repeat yourself -->
		<!-- <LocalScope v-slot="{ classes }" classes="py-3 font-semibold"> -->
		<!-- 	<p :class="classes">some text</p> -->
		<!-- 	<p :class="classes">some text</p> -->
		<!-- </LocalScope> -->
	</slot>
</template>
