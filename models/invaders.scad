/**
 * @module Space Invaders
 * @author Roland Hieber <rohieb+openscad@rohieb.name>
 * @license CC-0 (Public Domain), see http://creativecommons.org/about/cc0
 * 
 * All modules consume one 3-dimensional child, which is fed as the
 * second parameter to minkowski(). This allows you to render contiguous
 * shapes while not losing the pixel-ish look.
 *
 * For example, try:
 * <code>
 * 	space_invader_1(height=.5) cylinder(r=0.15, h=0.2);
 * </code>
 */

module __block() {
	polygon([[0,0],[0,1],[1,1],[1,0]]);
}

/**
 *    █     █
 *  █  █   █  █
 *  █ ███████ █
 *  ███ ███ ███
 *  ███████████
 *   █████████
 *    █     █
 *   █       █
 */
module space_invader_1(height=1) {
	minkowski() {
		difference() {
			// body and arms
			union() {
				linear_extrude(height=height)
					polygon([[0,7],[1,7],[1,5],[1,5],[2,5],[2,6],[3,6],[3,7],[4,7],
						[4,6],[7,6],[7,7],[8,7],[8,6],[9,6],[9,5],[10,5],[10,7],
						[11,7],[11,3],[10,3],[10,2],[9,2],[9,1],[8,1],[8,2],[3,2],
						[3,1],[2,1],[2,2],[1,2],[1,3],[0,3]
					]);
				// horns
				linear_extrude(height=height)
					translate([2,7]) __block();
				linear_extrude(height=height)
					translate([8,7]) __block();
				// feet
				linear_extrude(height=height)
					translate([1,0]) __block();
				linear_extrude(height=height)
					translate([9,0]) __block();
			}

			// eyes
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([3,4]) __block();
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([7,4]) __block();
		}
		children();
	}
}

/**
 *   █     █
 *    █   █
 *   ███████
 *  ██ ███ ██
 * ███████████
 * █ ███████ █
 * █ █     █ █
 *    ██ ██
 */
module space_invader_2(height=1) {
	minkowski() {
		difference() {
			// body
			union() {
				linear_extrude(height=height)
					polygon([[0,1],[0,4],[1,4],[1,5],[2,5],[2,6],[3,6],[3,7],[4,7],
						[4,6],[7,6],[7,7],[8,7],[8,6],[9,6],[9,5],[10,5],[10,4],
						[11,4],[11,1],[10,1],[10,3],[9,3],[9,1],[8,1],[8,2],[3,2],
						[3,1],[2,1],[2,3],[1,3],[1,1],[0,1]
					]);
				// horns
				linear_extrude(height=height)
					translate([2,7]) __block();
				linear_extrude(height=height)
					translate([8,7]) __block();
				// arms
				linear_extrude(height=height)
					polygon([[3,1],[5,1],[5,0],[3,0]]);
				linear_extrude(height=height)
					polygon([[6,1],[8,1],[8,0],[6,0]]);
			}
			// eyes
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([3,4]) __block();
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([7,4]) __block();
		}
		children();
	}
}

/**
 *    ██
 *   ████
 *  ██████
 * ██ ██ ██
 * ████████
 *   █  █
 *  █ ██ █
 * █ █  █ █
 */
module space_invader_3(height=1) {
	minkowski() {
		difference() {
			union() {
				// body
				linear_extrude(height=height)
					polygon([[0,3],[0,5],[1,5],[1,6],[2,6],[2,7],[3,7],[3,8],
						[5,8],[5,7],[6,7],[6,6],[7,6],[7,5],[8,5],[8,3]
					]);
				// tentacles
				linear_extrude(height=height)
					translate([0,0]) __block();
				linear_extrude(height=height)
					translate([2,0]) __block();
				linear_extrude(height=height)
					translate([5,0]) __block();
				linear_extrude(height=height)
					translate([7,0]) __block();
				linear_extrude(height=height)
					translate([1,1]) __block();
				linear_extrude(height=height)
					polygon([[3,1],[5,1],[5,2],[3,2]]);
				linear_extrude(height=height)
					translate([6,1]) __block();
				linear_extrude(height=height)
					translate([2,2]) __block();
				linear_extrude(height=height)
					translate([5,2]) __block();
			}
			// eyes
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([2,4]) __block();
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([5,4]) __block();
		}
		children();
	}
}

/**
 *    ██
 *   ████
 *  ██████
 * ██ ██ ██
 * ████████
 *  █ ██ █
 * █      █
 *  █    █
 */
module space_invader_4(height=1) {
	minkowski() {
		difference() {
			union() {
				// body
				linear_extrude(height=height)
					polygon([[0,3],[0,5],[1,5],[1,6],[2,6],[2,7],[3,7],[3,8],[5,8],
						[5,7],[6,7],[6,6],[7,6],[7,5],[8,5],[8,3],[7,3],[7,2],[6,2],
						[6,3],[5,3],[5,2],[3,2],[3,3],[2,3],[2,2],[1,2],[1,3]
					]);
				// feet
				linear_extrude(height=height)
					translate([0,1]) __block();
				linear_extrude(height=height)
					translate([1,0]) __block();
				linear_extrude(height=height)
					translate([7,1]) __block();
				linear_extrude(height=height)
					translate([6,0]) __block();
			}
			// eyes
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([2,4]) __block();
			translate([0,0,-.5])
				linear_extrude(height=height+1)
				translate([5,4]) __block();
		}
		children();
	}
}

// Here be dragons^WSpace Invaders. (Example code following)
invader=2;

scale(0.16)
translate([0,1,0])
rotate([90,0,0]) {
    if (invader==1) {
        translate([-5.5,0,0])
        space_invader_1();
    }
    if (invader==2) {
        translate([-5.5,0,0])
        space_invader_2();
    }
    if (invader==3) {
        translate([-4,0,0])
        space_invader_3();
    }
    if (invader==4) {
        translate([-4,0,0])
        space_invader_4();
    }
}
