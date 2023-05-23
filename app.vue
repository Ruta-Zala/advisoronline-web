<template>
	<div>
		<!-- bottom-0 class does not work for some reasons -->
		<noscript
			class="fixed z-50 mb-3 ml-3 bg-red-200 px-5 py-3 text-white-100"
			style="bottom: 0"
		>
			For better experience with this website is recommened to have JavaScript
			enabled.
		</noscript>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
