'use strict';

module.exports = ElementGroups;

function ElementGroups(vertexBuffer, elementBuffer, secondElementBuffer) {

    this.vertexBuffer = vertexBuffer;
    this.elementBuffer = elementBuffer;
    this.secondElementBuffer = secondElementBuffer;
    this.groups = [];
}

ElementGroups.prototype.makeRoomFor = function(vertexLength, elementLength, secondElementLength) {
    if (!this.current || this.current.vertexLength + vertexLength > 65535) {
        this.current = new ElementGroup(this.vertexBuffer.length,
                this.elementBuffer && this.elementBuffer.length,
                this.secondElementBuffer && this.secondElementBuffer.length);
        this.groups.push(this.current);
    }

    if (this.vertexBuffer) this.vertexBuffer.makeRoomFor(vertexLength);
    if (this.elementBuffer) this.elementBuffer.makeRoomFor(elementLength);
    if (this.secondElementBuffer) this.secondElementBuffer.makeRoomFor(secondElementLength);

    return this.current;
};

function ElementGroup(vertexStartIndex, elementStartIndex, secondElementStartIndex) {
    // the offset into the vertex buffer of the first vertex in this group
    this.vertexStartIndex = vertexStartIndex;
    this.elementStartIndex = elementStartIndex;
    this.secondElementStartIndex = secondElementStartIndex;
    this.elementLength = 0;
    this.vertexLength = 0;
    this.secondElementLength = 0;
}
