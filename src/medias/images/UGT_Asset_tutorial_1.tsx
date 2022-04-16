import React from 'react';

export interface ImgTutorialFirstProps extends React.SVGProps<SVGSVGElement> {
    alt?: string;
    fill?: string;
}

export const ImgTutorialFirst: React.FunctionComponent<
    ImgTutorialFirstProps
> = ({ alt, fill, ...props }) => {
    return (
        <svg
            width='327'
            height='265'
            viewBox='0 0 327 265'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
        >
            <rect
                width='390'
                height='844'
                transform='translate(-32 -172)'
                fill='white'
            />
            <rect
                x='104'
                y='31'
                width='119'
                height='211'
                fill='url(#pattern0)'
            />
            <rect x='8' y='10' width='38' height='38' rx='19' fill='#1337B8' />
            <path
                d='M29.629 20.5455V38H26.987V23.1875H26.885L22.709 25.9148V23.392L27.064 20.5455H29.629Z'
                fill='white'
            />

            <defs>
                <pattern
                    id='pattern0'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_658_18887'
                        transform='translate(-0.000162777) scale(0.00429324 0.00242131)'
                    />
                </pattern>
              <image
                    id='image0_658_18887'
                    width='233'
                    height='413'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </svg>
    );
};
