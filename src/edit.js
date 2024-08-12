import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import {
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';

import { Fragment, useState, useEffect } from '@wordpress/element';

import classnames from 'classnames';

import { ReactComponent as MacIcon } from './assets/mac.svg';
import { ReactComponent as WindowsIcon } from './assets/win.svg';
import { ReactComponent as GenericIcon } from './assets/generic.svg';

import './editor.scss';

export default function Edit( { attributes, setAttributes, className } ) {
	// Use the blockProps hook to manage className and other properties
	const blockProps = useBlockProps();
	const hasContent = attributes.content !== '';
	const dataType =
		attributes.contentType === 'title' ? 'data-title' : 'data-url';

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <GenericIcon /> }
						title={__("Generic", "tp-frames")}
						value=""
						onClick={ () => setAttributes( { os: '' } ) }
						isActive={ '' === attributes.os }
					/>
					<ToolbarButton
						icon={ <MacIcon /> }
						title={__("macOS", "tp-frames")}
						value="mac"
						onClick={ () => setAttributes( { os: 'mac' } ) }
						isActive={ 'mac' === attributes.os }
					/>
					<ToolbarButton
						icon={ <WindowsIcon /> }
						title={__("Windows", "tp-frames")}
						value="win"
						onClick={ () => setAttributes( { os: 'win' } ) }
						isActive={ 'win' === attributes.os }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Appearance" initialOpen={ true }>
					<ToggleGroupControl
						__nextHasNoMarginBottom
						title={__("Window Style", "tp-frames")}
						onChange={ ( os ) => setAttributes( { os } ) }
						value={ attributes.os }
						isBlock
					>
						<ToggleGroupControlOption label={__("Generic", "tp-frames")} value="" />
						<ToggleGroupControlOption label={__("macOS", "tp-frames")} value="mac" />
						<ToggleGroupControlOption label={__("Windows", "tp-frames")} value="win" />
					</ToggleGroupControl>
					<ToggleControl
						label={__("Dark", "tp-frames")}
						checked={ attributes.dark }
						onChange={ ( dark ) => setAttributes( { dark } ) }
					/>
					<ToggleControl
						label={__("Wireframe", "tp-frames")}
						checked={ attributes.wireframe }
						onChange={ ( wireframe ) =>
							setAttributes( { wireframe } )
						}
					/>
					<ToggleControl
						label={__("Edge-to-Edge", "tp-frames")}
						checked={ attributes.borderless }
						onChange={ ( borderless ) =>
							setAttributes( { borderless } )
						}
					/>
					<ToggleControl
						label={__("Centered Bar Content", "tp-frames")}
						checked={ attributes.centered }
						onChange={ ( centered ) =>
							setAttributes( { centered } )
						}
					/>
				</PanelBody>
				<PanelBody title="Content" initialOpen={ true }>
					<TextControl
						__nextHasNoMarginBottom
						label={__("Content", "tp-frames")}
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
					/>
					<ToggleGroupControl
						__nextHasNoMarginBottom
						label={__("Type", "tp-frames")}
						onChange={ ( contentType ) =>
							setAttributes( { contentType } )
						}
						value={ attributes.contentType }
						isBlock
					>
						<ToggleGroupControlOption label={__("Title", "tp-frames")} value="title" />
						<ToggleGroupControlOption label={__("URL", "tp-frames")} value="url" />
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div
					className={ classnames(
						'app-frame',
						{ dark: attributes.dark },
						{ mac: 'mac' === attributes.os },
						{ win: 'win' === attributes.os },
						{ borderless: attributes.borderless },
						{ centered: attributes.centered },
						{ wireframe: attributes.wireframe }
					) }
					{ ...( hasContent
						? {
								[ dataType ]: attributes.content,
								'aria-label': attributes.content,
						  }
						: {} ) }
				>
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}
