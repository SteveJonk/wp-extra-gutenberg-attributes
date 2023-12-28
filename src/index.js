import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import cn from "classnames";
import "./style.scss";

/**
 * Add the attribute to the block.
 * This is the attribute that will be saved to the database.
 *
 * @param {object} settings block settings
 * @param {string} name block name
 * @returns {object} modified settings
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype
 */
addFilter(
	"blocks.registerBlockType",
	"stef/gutenberg-extra-attributes",
	function (settings, name) {
		if (!name.includes("core")) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				isMobileHidden: {
					type: "boolean",
					default: false,
				},
			},
		};
	},
);

/**
 * Edit component for the block.
 *
 * @param {object} props block props
 * @returns {JSX}
 */
function Edit(props) {
	const setIsMobileHidden = (value) => {
		props.setAttributes({ isMobileHidden: value });
	};

	return (
		<InspectorControls>
			<PanelBody title={__("Extra attributes")}>
				<PanelRow>
					<ToggleControl
						label="Hide on mobile"
						checked={props.attributes.isMobileHidden}
						onChange={setIsMobileHidden}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}

/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 */
addFilter(
	"editor.BlockEdit",
	"stef/gutenberg-extra-attributes",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (!props.name.includes("core/")) {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<BlockEdit {...props} />
					<Edit {...props} />
				</>
			);
		};
	}),
);

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */

function applyExtraClass(extraProps, blockType, attributes) {
	const { isMobileHidden } = attributes;

	if (isMobileHidden) {
		extraProps.className = cn(extraProps.className, "mobile-hidden");
	}

	return extraProps;
}

addFilter(
	"blocks.getSaveContent.extraProps",
	"stef/applyExtraClass",
	applyExtraClass,
);
