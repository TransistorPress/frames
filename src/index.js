import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import { ReactComponent as FramesIcon } from './assets/icon.svg';

registerBlockType( metadata.name, {
	icon: FramesIcon,
	edit: Edit,
	save,
} );
