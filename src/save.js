import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const hasContent = attributes.content !== '';
	const dataType =
		attributes.contentType === 'title' ? 'data-title' : 'data-url';

	return (
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
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
