




/**
 * Load the mime type based on the signature of the first bytes of the file
 * @param  {File}   file        A instance of File
 * @param  {Function} callback  Callback with the result
 * @author Victor www.vitim.us
 * @date   2017-03-23  
 * @author Cirec 
 * @date   2024-04-22 
 */
    
    type MimeType = {
        mime: string;
        pattern: number[];
    }

    //List of known ACCEPTED_IMAGE_MIME_TYPES
    const ACCEPTED_IMAGE_MIME_TYPES: MimeType[] = [
        {
            mime: 'image/jpeg',
            pattern: [0xFF, 0xD8, 0xFF],
        },
        {
            mime: 'image/jpg',
            pattern: [0xFF, 0xD8, 0xFF],
        },
        {
            mime: 'image/png',
            pattern: [0x89, 0x50, 0x4E, 0x47],
        },
        {
            mime: 'image/webp',
            pattern: [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50],
        }
        // you can expand this list @see https://mimesSniff.spec.whatwg.org/#matching-an-image-type-pattern
    ];

    export const ACCEPTED_IMAGE_TYPES = ACCEPTED_IMAGE_MIME_TYPES.map(mimeType => mimeType.mime)

export const isAcceptedImage = (file: File, callback: Function) => {

    function check(bytes: Uint8Array, mime: MimeType) {
        return mime.pattern.every((p, i) => !p || bytes[i] === p);
    }

    const numBytesNeeded = Math.max(...ACCEPTED_IMAGE_MIME_TYPES.map(m => m.pattern.length));
    const blob = file.slice(0, numBytesNeeded); // Read the needed bytes of the file

    const reader = new FileReader();
    reader.onloadend = (e) => {
        if (e.target?.readyState === FileReader.DONE) {
            let bytes = new Uint8Array(e.target.result as ArrayBuffer);

            for (let i = 0, l = ACCEPTED_IMAGE_MIME_TYPES.length; i < l; ++i) {
                if (check(bytes, ACCEPTED_IMAGE_MIME_TYPES[i])) return callback(true,
                    {
                        realMimeType: ACCEPTED_IMAGE_MIME_TYPES[i].mime,
                        fileMimeType: file.type
                    }
                );
            }

            return callback(false,
                {
                    realMimeType: "unknown",
                    fileMimeType: file.type
                }
            );
        }
    };

    reader.readAsArrayBuffer(blob);
}

// the same function but it return a promise no callback used
export const isAcceptedImg = async (file: File): Promise<{ accepted: boolean, mimeType: { realMimeType: string, fileMimeType: string } }> => {
    return new Promise((resolve, reject) => {
        function check(bytes: Uint8Array, mime: MimeType) {
            return mime.pattern.every((p, i) => !p || bytes[i] === p);
        }

        const numBytesNeeded = Math.max(...ACCEPTED_IMAGE_MIME_TYPES.map(m => m.pattern.length));
        const blob = file.slice(0, numBytesNeeded); // Read the needed bytes of the file

        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            if (e.target?.readyState === FileReader.DONE) {
                let bytes = new Uint8Array(e.target.result as ArrayBuffer);

                for (let i = 0, l = ACCEPTED_IMAGE_MIME_TYPES.length; i < l; ++i) {
                    if (check(bytes, ACCEPTED_IMAGE_MIME_TYPES[i])) {
                        resolve({
                            accepted: true,
                            mimeType: {
                                realMimeType: ACCEPTED_IMAGE_MIME_TYPES[i].mime,
                                fileMimeType: file.type
                            }
                        });
                        return;
                    }
                }

                resolve({
                    accepted: false,
                    mimeType: {
                        realMimeType: "unknown",
                        fileMimeType: file.type
                    }
                });
            }
        };

        fileReader.onerror = () => {
            reject(new Error("Error reading file."));
        };

        fileReader.readAsArrayBuffer(blob);
    });
};
