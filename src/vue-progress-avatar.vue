<template>
	<div class="vpa-container" :style="`width: ${doubleRadius}px`">
		<svg
			class="vpa-svg"
			xmlns="http://www.w3.org/2000/svg"
			:height="doubleRadius"
			:width="doubleRadius"
			:viewBox="`0 0 ${doubleRadius} ${doubleRadius}`"
			preserveAspectRatio="xMinYMin meet"
		>
			<circle
				class="animated"
				:stroke="strokeColor"
				fill="transparent"
				:stroke-linecap="strokeLinecap"
				:stroke-dasharray="`${circumference} ${circumference}`"
				:stroke-dashoffset="strokeDashoffset"
				:stroke-width="stroke"
				:r="normalizedRadius"
				:cx="radius"
				:cy="radius"
			/>
		</svg>
		<div
			:style="`border-width: ${stroke}px; border-color: ${innerStrokeColor}; background-color: ${fillColor}`"
			class="vpa-image-container">
			<img
				v-if="image"
				loading="lazy"
				:src="image"
				alt="Avatar">
		</div>
	</div>
</template>

<script>
	export default {
		name: "vue-progress-avatar",
		props: {
			image: {
				type: String,
				required: false
			},
			totalPoits: {
				type: Number,
				default: 100,
				required: false
			},
			strokeColor: {
				type: String,
				default: '#BBEE29',
				required: false
			},
			fillColor: {
				type: String,
				default: '#f5f5f5',
				required: false
			},
			innerStrokeColor: {
				type: String,
				default: '#dedede',
				required: false
			},
			strokeLinecap: {
				type: String,
				default: 'round',
				required: false
			},
			progress: {
				type: Number,
				default: 0,
				required: false
			},
			radius: {
				type: Number,
				default: 40,
				required: false
			},
			stroke: {
				type: Number,
				default: 4,
				required: false
			}
		},
		data() {
			const doubleRadius = this.radius * 2;
			const normalizedRadius = this.radius - this.stroke / 2;
			const circumference = normalizedRadius * 2 * Math.PI;

			return {
				doubleRadius,
				normalizedRadius,
				circumference
			}
		},
		computed: {
			strokeDashoffset() {
				return this.circumference - this.progress / this.totalPoits * this.circumference;
			}
		},
	}
</script>

<style lang="css">
	.vpa-container * {
		box-sizing: border-box;
	}

	.vpa-container {
		position: relative;
	}

	.vpa-container .vpa-svg {
		position: relative;
		z-index: 10;
		display: block;
		vertical-align: middle;
	}

	.vpa-container svg circle.animated {
		transition: stroke-dashoffset 0.35s;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}

	.vpa-image-container {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		overflow: hidden;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border-style: solid;
	}

	.vpa-image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
