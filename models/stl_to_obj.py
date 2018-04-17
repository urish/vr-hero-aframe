import bpy
import sys

argv = sys.argv
argv = argv[argv.index("--") + 1:] # get all args after "--"

stl_in = argv[0]
obj_out = argv[1]

bpy.ops.import_mesh.stl(filepath=stl_in)
bpy.ops.export_scene.obj(filepath=obj_out, use_materials=False, use_selection=True)
