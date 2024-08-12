const fs = require( 'fs' );
const path = require( 'path' );
const glob = require( 'glob' );
const { green, blue, yellow, cyan, bold } = require( 'colorette' ); // Importing colorette for formatting

// Source and destination directories
const sourceDir = path.join(
	__dirname,
	'..',
	'node_modules',
	'css-device-frames',
	'src'
);
const destDir = path.join( __dirname, '..', 'src', 'css-device-frames' );

// Ensure destination directory exists
if ( ! fs.existsSync( destDir ) ) {
	fs.mkdirSync( destDir, { recursive: true } );
	console.log( blue( '📂 Created directory:' ), green( destDir ) );
}

// Function to perform search-and-replace within files
const replaceInFile = ( filePath ) => {
	let content = fs.readFileSync( filePath, 'utf8' );

	// Replace .app-frame with .wp-block-app-frame
	content = content.replace( /#999/g, '#595959' );
	content = content.replace( /#737373/g, '#595959' );

	// Replace --background and similar variables with --bg
	content = content.replace( /(--[\w-]*background)/g, ( match ) => {
		return match.replace( 'background', 'bg' );
	} );

	// Prefix all CSS variables with --cdf-
	content = content.replace( /--(\w+)/g, '--cdf-$1' );

	return content;
};

// Copy files from source to destination with search-and-replace
const files = glob.sync( `${ sourceDir }/**/*` );

files.forEach( ( file ) => {
	const relativePath = path.relative( sourceDir, file );
	const destPath = path.join( destDir, relativePath );

	if ( fs.lstatSync( file ).isDirectory() ) {
		if ( ! fs.existsSync( destPath ) ) {
			fs.mkdirSync( destPath, { recursive: true } );
			console.log( blue( '📂 Created directory:' ), green( destPath ) );
		}
	} else {
		const modifiedContent = replaceInFile( file );
		fs.writeFileSync( destPath, modifiedContent );
		console.log(
			green( '✅ Copied and modified:' ),
			yellow( file ),
			cyan( '→' ),
			green( destPath )
		);
	}
} );

console.log(
	bold( green( '🎉 All files copied and modified successfully!' ) )
);
