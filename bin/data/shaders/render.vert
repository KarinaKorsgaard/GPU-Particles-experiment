#version 120
#extension GL_EXT_gpu_shader4 : enable
#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect posTex;
uniform sampler2DRect velData;
uniform vec2 screen;
uniform float resolution;
varying vec4 colorv;

void main() {
    // use the texture coordinates as an index into the position texture
    vec2 verPos = gl_MultiTexCoord0.xy;

    // read position data from texture
    vec4 pixPos = texture2DRect( posTex, verPos );
    vec4 pixVel = texture2DRect( velData, verPos );
    // Maps the position from the texture (from 0.0 to 1.0) to
    // the screen position (0 - screenWidth/screenHeight)
    //
    pixVel = normalize(pixVel);
    
    pixPos.x *= screen.x;
    pixPos.y *= screen.y;

    gl_Position = pixPos;
    gl_FrontColor =  vec4(1.) ;
    gl_BackColor =  vec4(1.) ;
    
}
