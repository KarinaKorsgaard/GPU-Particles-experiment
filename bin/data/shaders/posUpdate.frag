#version 120
#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect prevPosData;  // recive the previus position texture
uniform sampler2DRect velData;      // recive the velocity texture

uniform float timestep;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void){
    vec2 st = gl_TexCoord[0].st;    // gets the position of the pixel that it´s dealing with...
    
    vec2 pos = texture2DRect( prevPosData, st ).xy; // ... in order to look at a particulary place on it
    float z = texture2DRect( prevPosData, st ).z; // ... in order to look at a particulary place on it
    vec2 vel = texture2DRect( velData, st ).xy;     // Fetch both the pos and vel.
    
    pos += vel * timestep; // Updates the position
//    if(pos.x < 0.0 || pos.x > 1.0)
//        pos.x = max(0.1,min( abs(sin(timestep)), 0.9)) ;
//    if(pos.y < 0.0 || pos.y > 1.0)
//        pos.y = pos.x + rand(st);
//
    
    vec4 color = vec4(pos.x,pos.y,1.0,1.0);
    if( length(pos-vec2(0.5) ) > .5)
    {
        pos = vec2(0.5) ;
    }

    gl_FragColor.rgba = vec4(pos.x, pos.y, z, 1.0);  // And finaly it store it on the position FBO
}
